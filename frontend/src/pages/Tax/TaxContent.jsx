import React, { useState, useEffect } from 'react'

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TaxInfo } from "./TaxInfo";
import { getTaxInfo } from "../../api/Account";
import { editTaxInfo } from "../../api/Account";


export default function TaxContent() {
    const [taxInfo, setTaxInfo] = useState({});

    // let result = {
    //     "id": "efb6b1be-b30a-465d-be85-bb14269e945d",
    //     "email": "user@gmail.com",
    //     "user": {
    //         "first_name": "user",
    //         "middle_initial": null,
    //         "last_name": null
    //     },
    //     "spouse": {
    //         "first_name": null,
    //         "middle_initial": null,
    //         "last_name": null
    //     },
    //     "father": {
    //         "first_name": null,
    //         "middle_initial": null,
    //         "last_name": null
    //     },
    //     "mother": {
    //         "first_name": null,
    //         "middle_initial": null,
    //         "last_name": null
    //     },
    //     "permanent_address": {
    //         "village_house": null,
    //         "road_block_sector": null,
    //         "police_station": null,
    //         "post_office": null,
    //         "post_code": null,
    //         "district": null
    //     },
    //     "present_address": {
    //         "village_house": null,
    //         "road_block_sector": null,
    //         "police_station": null,
    //         "post_office": null,
    //         "post_code": null,
    //         "district": null
    //     },
    //     "contact_no": null,
    //     "nid": null,
    //     "tin": null,
    //     "dob": null,
    //     "img": null
    // }

    useEffect(() => {
        (async () => {
            //console.log("Inside useEffect");
            let data = await getTaxInfo();
            //console.log("Data paisi");
            console.log(data);
            setTaxInfo(data);
        })();
    }, []);



    return (
        <Box m={1.5} sx={{ flexGrow: 1 }}>
            <h1> Tax Return Information </h1>
            {/* {console.log("Tax Info")}
            {console.log(taxInfo)} */}
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TaxInfo
                        id={taxInfo.id}
                        name={taxInfo.user ? (taxInfo.user.first_name ? taxInfo.user.first_name : "") : ""}
                        email={taxInfo.email ? taxInfo.email : ""}
                        fatherName={taxInfo.father ? (taxInfo.father.first_name ? taxInfo.father.first_name : "") : ""}
                        motherName={taxInfo.mother ? (taxInfo.mother.first_name ? taxInfo.mother.first_name : "") : ""}
                        spouseName={taxInfo.spouse ? (taxInfo.spouse.first_name ? taxInfo.spouse.first_name : "") : ""}
                        dob={taxInfo.dob ? taxInfo.dob : ""}
                        nid={taxInfo.nid ? taxInfo.nid : ""}
                        tin={taxInfo.tin ? taxInfo.tin : ""}
                        contactNo={taxInfo.contact_no ? taxInfo.contact_no : ""}
                        address={taxInfo.present_address ? (taxInfo.present_address.village_house ? taxInfo.present_address.village_house : "") : ""}
                    /> 
                    
                </Grid>
            </Grid>
        </Box>
    )
}