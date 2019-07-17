import React, { Component } from 'react'
import { Container, Table } from 'reactstrap';

export default class Results extends Component {
    show = (mems) => {
        console.log(mems);
        mems.forEach((record) => {
            console.log(record.co_name);
        });
    };

    add_space = (tel_number) => {
        let result = tel_number.substring(0, 5) + ' ' + tel_number.substring(5, tel_number.length);
        return result;

    }

    verify_telephone_number = (ptel, stel) => {
        var temp_ptel; 
        var temp_stel;
        let tel_result = ''

        // Early out
        if (ptel.length === 0 && stel.length === 0) {
            return tel_result;
        }

        // There are two telephone numbers to display
        if ((ptel.length && stel.length) !== 0) {
            if (!ptel.startsWith("0")) {
                // Add a leading zero and then a space. 
                temp_ptel = '0' + ptel;
                temp_ptel = this.add_space(temp_ptel);
            } else {
                // Just a space
                temp_ptel = this.add_space(ptel);
            }
            if (!stel.startsWith("0")) {
                temp_stel = '0' + stel;
                temp_stel = this.add_space(temp_stel);
            } else {
                temp_stel = this.add_space(stel);
            }
            tel_result = temp_ptel + ' ' + 'or' + ' ' + temp_stel;
            return tel_result;
        } else if (ptel.length === 0) {

            // return only the secondary
            if (!stel.startsWith("0")) {
                temp_stel = '0' + stel;
                temp_stel = this.add_space(temp_stel);
            } else {
                temp_stel = this.add_space(stel);
            }
            return temp_stel;

        } else if (stel.length === 0) {

            // return only the primary
            if (!ptel.startsWith("0")) {
                // Add a leading zero and then a space. 
                temp_ptel = '0' + ptel;
                temp_ptel = this.add_space(temp_ptel);
            } else {
                // Just a space
                temp_ptel = this.add_space(ptel);
            }
            return temp_ptel;
        }
    }

    test = () => {
        let results = []
        const m = this.props.members
        let idx = 0
        var name;
        m.forEach((rec) => {
            idx += 1;
            name = rec.p_forename + ' ' + rec.p_surname;
            const tel_numbers = this.verify_telephone_number(rec.p_tel, rec.s_tel);
            //phone_num = ptel.substring(0,4) + ' '  + ptel.substring(4, ptel.len);
            results.push(<tr><th scope="row">{idx}</th><td>{rec.co_name}</td><td>{name}</td><td>{tel_numbers}</td><td>{rec.email}</td></tr>);
        });
        console.log(results);
        return (results);
    }

    render() {
        const r = this.test();
        let table = []
        if (!r.length > 0) {

        } else {
            table = [<thead><tr><th>#</th></tr></thead>]
        }
        return (
            <Container>
                <div className="tabler">
                    <Table >
                        {table}
                        <tbody>
                            {r}
                        </tbody>
                    </Table>
                </div>
            </Container>
        )
    }
}
