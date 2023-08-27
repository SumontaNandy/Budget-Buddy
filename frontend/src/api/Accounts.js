import React, { useEffect, useState } from "react";

import axios from "axios";
import { api_url } from ".";

export const getAllAccountTypes = () =>
    axios.get(api_url(`account-types/`)).then((res) => res.data);

export const getAccountsForAccountType = (type_id) =>
    axios.get(api_url(`account-types/${type_id}`)).then((res) => res.data);

export const Accounts = () => {
    console.log("Inside Accounts");
    const [userAccounts, setUserAccounts] = useState([]);

    useEffect(() => {
        const fetchUserAccounts = async () => {
            const accountTypes = await getAllAccountTypes();
            //console.log("Types: ", accountTypes);
            var userAccounts = [];

            const traverseAccountTypes = async (types) => {
                if(types.length === 0)
                    return;
                //console.log("Types: ", types);
                for (const type of types) {
                    
                    //console.log("Type: ", type)
                    const accountsForType = await getAccountsForAccountType(type.id);
                    //console.log("==================")
                    //console.log("Here: ", accountsForType);
                    const accounts = accountsForType.accounts;
                    //console.log("Accounts: ", accounts)
                    if(accounts.length > 0) 
                        userAccounts.push(...accounts)
                    //console.log("Inside recursion: ", userAccounts);

                    if(accountsForType.child.length > 0)
                        await traverseAccountTypes(accountsForType.child);
                }
            };

            traverseAccountTypes(accountTypes);
            //console.log("Outside recursion: ", userAccounts);
            setUserAccounts(userAccounts);
        };

        fetchUserAccounts();
    }, []);

    //console.log("User Accounts: ", userAccounts);
    return userAccounts;
};

export default Accounts;
