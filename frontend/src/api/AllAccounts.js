import { useEffect, useState } from "react";

import { getAllAccountTypes, getAccountsForAccountType } from "./Account";

export const AllAccounts = () => {
    //console.log("Inside Accounts");
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

export const getAllAccounts = async () => {
    const accountTypes = await getAllAccountTypes();
    console.log("Types: ", accountTypes);
    var userAccounts = [];

    const traverseAccountTypes = async (types) => {
        if(types.length === 0)
            return;
        //console.log("Types: ", types);
        for (const type of types) {
            
            console.log("Type: ", type)
            const accountsForType = await getAccountsForAccountType(type.id);
            //console.log("==================")
            console.log("Here: ", accountsForType);
            const accounts = accountsForType.accounts;
            //console.log("Accounts: ", accounts)
            if(accounts.length > 0) 
                userAccounts.push(...accounts)
            //console.log("Inside recursion: ", userAccounts);

            if(accountsForType.child.length > 0)
                await traverseAccountTypes(accountsForType.child);
        }
    };

    await traverseAccountTypes(accountTypes);
    console.log("Outside recursion: ", userAccounts);

    return userAccounts;
}