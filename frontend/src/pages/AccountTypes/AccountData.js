import { useState, useEffect } from 'react';

import { getAccountsForAccountType } from '../../api/Account';

export default function AccountData(type_id) {
    const [data, setData] = useState([]);

	useEffect(() => {
        //console.log("Inside useEffect");
		const fetchAccountData = async () => {
            //console.log("Inside fetchAccountData");
			//const accountData = [];
            const accountData = await getAccountsForAccountType(type_id);
            //console.log("Account Data: ", accountData);
			setData(accountData);
		};
		fetchAccountData();
	}, []);

    // console.log("Outside data");

    // //console.log("Data: ", data);
    // const { parent, child, accounts } = data;
    // console.log("Parent: ", parent);
    // console.log("Child: ", child);
    // console.log("Accounts: ", accounts);
    return data;
}