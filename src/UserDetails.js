
export default function UserDetails({ session }) {
    // SAMPLE SESSION DATA
    // {
    //     "bot_id": "d948e9fa-cfd9-4ca7-bfec-b2cfa820364a",
    //     "duplicated_template_id": "",
    //     "notionOwner": {
    //         "id": "20086e4f-5507-4009-baec-bb2a81b2c34e",
    //         "name": "Joaquín",
    //         "avatar_url": "",
    //         "type": "person",
    //         "email": "joaquinariasgomezcal@gmail.com"
    //     },
    //     "workspace_icon": "",
    //     "workspace_id": "681abda1-366b-4fc1-9161-f0a3991618cc",
    //     "workspace_name": "Joaquín's Notion"
    // }

    return (
        <div>
            <p>
               {session.notionOwner.name}
            </p>
            <p>
               {session.notionOwner.avatar_url}
            </p>
        </div>
    )
}