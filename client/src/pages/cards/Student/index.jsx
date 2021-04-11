import React from 'react';
import Typography from "@material-ui/core/Typography";
import "./studentcard.css"

export default function StudentCard({student}) {
    // const [expanded, setExpanded] = React.useState(false);
    const [competence, setCompetence] = useState(false);

    return (
        <div className="student-card">
            <Typography variant="h5" color="primary" component="h2">
                {` ${student.name || ''} ${student.second_name || ''} ${student.surname || ''}`}
            </Typography>
            <div className="container">
                <div className="row align-items-center flex-row justify-content-center">
                    <div className="fresh-table full-color-orange">
                        <table id="fresh-table" className="table">
                            <thead>
                            <th data-field="id">ID</th>
                            <th data-field="name">Название</th>
                            <th data-field="desc">Описание</th>
                            </thead>
                            <tbody>
                                {competence}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
