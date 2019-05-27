import React, { Component } from 'react';
const API = `/api/logs/`;

export class Logs extends Component {

    state = {
        logs: []
    }

    getLogs() {
        fetch(API,
            {
                method: 'GET',
                headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
            })
            .then(response => {
                if (response.ok) {
                    return response
                } throw Error("Something went wrong.")
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState(
                    {
                        logs: data
                    }
                )
            })
            .catch(error => console.log("Error when getting logs.", error))
    }

    componentDidMount() {
        this.getLogs();
    }

    render() {

        const logs = this.state.logs
            .map(data => <tr>
                <th scope="row">{data.id}</th>
                <td>
                { data.user } </td>
                <td>
                { data.activity } </td>
                <td>
                    {new Date(data.date).toString() } </td>
                          </tr>)


        return (
            <div className="container">
                <div className="row">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">User</th>
                                <th scope="col">Activity</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {logs}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
