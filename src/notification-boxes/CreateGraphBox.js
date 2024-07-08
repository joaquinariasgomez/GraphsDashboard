import { useGlobalStateValue } from "../context/GlobalStateProvider";
import { actionTypes } from "../context/globalReducer";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CreateGraphStep1 from "../components/CreateGraphStep1";
import CreateGraphStep2 from "../components/CreateGraphStep2";
import CreateGraphStep3 from "../components/CreateGraphStep3";
import { useEffect, useState } from "react";
import { getExpensesCategories, getGraphTypeAccess, getIncomesBankAccounts, getIncomesSources } from "../RequestUtils";

export default function CreateGraphBox() {

    // Context
    const [{botIdCookie}, dispatch] = useGlobalStateValue();

    // State to manage form data
    const [step, setStep] = useState(1);
    const [createGraphData, setCreateGraphData] = useState({
        graphType: 'EXPENSES',
        graphTag: 'DAILY',
        filterCategories: {  // 'SUM',    // 'SUM', 'BY CATEGORY', 'BY BANKACCOUNT', 'BY INCOMESOURCE', 
            type: 'SUM',    // 'SUM' for all expenses/incomes/savings
                            // 'BY CATEGORY' for groupings by category/bankacount/incomesource
                            // 'SPECIFIC CATEGORY' for specific category/bankaccount/incomesource
            category: 'Select category' // Specify the category for 'SPECIFIC' type
        },
        groupBy: 'DAY',
        time: 'LAST WEEK',
        customStartDate: '',
        customEndDate: '',
        plot: 'Select plot' // This will be a customization for certain graphs
    });
    const [graphTypeAccessLoading, setGraphTypeAccessLoading] = useState(true);
    const [graphTypeAccess, setGraphTypeAccess] = useState("");

    const [expensesCategoriesLoading, setExpensesCategoriesLoading] = useState(true);
    const [expensesCategories, setExpensesCategories] = useState([]);

    const [incomesBankAccountsLoading, setIncomesBankAccountsLoading] = useState(true);
    const [incomesBankAccounts, setIncomesBankAccounts] = useState([]);

    const [incomesSourcesLoading, setIncomesSourcesLoading] = useState(true);
    const [incomesSources, setIncomesSources] = useState([]);
    
    useEffect(() => {
        console.log("createGraphData data: ", createGraphData);
    }, [createGraphData]);

    // Do all the necessary requests at the beginning of the form
    useEffect(() => {
        fetchGraphTypeAccess();
        fetchExpensesCategories();
        fetchIncomesBankAccounts();
        fetchIncomesSources();
    }, [botIdCookie]);

    const closeBox = () => {
        dispatch({
            type: actionTypes.SET_SHOW_CREATE_GRAPH_BOX,
            value: false
        })
    }

    const fetchGraphTypeAccess = async () => {
        if(botIdCookie !== "") {
            const apiResponse = await getGraphTypeAccess(botIdCookie);
            if(apiResponse) {
                setGraphTypeAccess(apiResponse);
                setGraphTypeAccessLoading(false);
            }
        }
    }

    const fetchExpensesCategories = async () => {
        if(botIdCookie !== "") {
            const apiResponse = await getExpensesCategories(botIdCookie);
            if(apiResponse) {
                setExpensesCategories(apiResponse);
                setExpensesCategoriesLoading(false);
            }
        }
    }

    const fetchIncomesBankAccounts = async () => {
        if(botIdCookie !== "") {
            const apiResponse = await getIncomesBankAccounts(botIdCookie);
            if(apiResponse) {
                setIncomesBankAccounts(apiResponse);
                setIncomesBankAccountsLoading(false);
            }
        }
    }

    const fetchIncomesSources = async () => {
        if(botIdCookie !== "") {
            const apiResponse = await getIncomesSources(botIdCookie);
            if(apiResponse) {
                setIncomesSources(apiResponse);
                setIncomesSourcesLoading(false);
            }
        }
    }

    const handleNextStep = () => {
        setStep(step + 1);
    }

    const handleOnEndStep = () => {
        setStep(step + 2);
    }

    const handleOnBeginStep = () => {
        setStep(step - 2);
    }

    const handlePrevStep = () => {
        setStep(step - 1);
    }

    const handleDataChange = (data) => {
        setCreateGraphData({ ...createGraphData, ...data});
    }

    return (
        <div className='creategraphbox__backdrop' onClick={closeBox}>
            <div className="creategraphbox__container" onClick={e => {e.stopPropagation(); }}>
                <button className="creategraphbox__cancelbutton" onClick={function() {
                        closeBox();
                }}>
                    <CloseRoundedIcon fontSize="medium" />
                </button>
                <h1>New Graph</h1>
                {step === 1 && <CreateGraphStep1 graphOptions={createGraphData} onNext={handleNextStep} onEnd={handleOnEndStep} onChange={handleDataChange}
                    graphTypeAccessLoading={graphTypeAccessLoading}
                    graphTypeAccess={graphTypeAccess} />}
                {step === 2 && <CreateGraphStep2 graphOptions={createGraphData} onPrev={handlePrevStep} onNext={handleNextStep} onChange={handleDataChange}
                    expensesCategoriesLoading={expensesCategoriesLoading}
                    expensesCategories={expensesCategories}
                    incomesBankAccountsLoading={incomesBankAccountsLoading}
                    incomesBankAccounts={incomesBankAccounts}
                    incomesSourcesLoading={incomesSourcesLoading}
                    incomesSources={incomesSources} />}
                {step === 3 && <CreateGraphStep3 graphOptions={createGraphData} onPrev={handlePrevStep} onBegin={handleOnBeginStep} onChange={handleDataChange} />}
            </div>
        </div>
    );
}