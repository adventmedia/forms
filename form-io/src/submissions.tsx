import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface IFormData {
  nickname: string;
  height: number;
  weight: number;
  bodytemperature: number;
  bloodpressure: string;
  symptoms: string;
}

function Submissions() {
  const history = useHistory();
  debugger;
  const loc = window.location.href;
  const x = loc.indexOf('/',8);
  const url = loc.substr(0, x) + '/ws/submissions.php';
  console.log('submit url:', url, loc, x, loc.substr(x));
  const [submittedForms, setSubmittedForms] = useState<IFormData[]>([]);
  const [formData, setFormData] = useState<IFormData[]>([]);

  useEffect(() => {
    if (submittedForms) {
      console.log(submittedForms);
      submittedForms.forEach(item => {
        item.symptoms = item.symptoms.split(',').join("\n");
      });
      setFormData(submittedForms);
    }
  }, [submittedForms]);

  const getFormData = () => {
    fetch(url, {
      method: "GET"
    })
      .then(res => res.json())
      .then(result => {
        setSubmittedForms(result.message);
      });
  };

  const viewForm = () => {
    history.push("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Submitted Assessments</h2>
        </div>
      </div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nickname</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Temperature</th>
              <th>Blood Pressure</th>
              <th>Symptoms</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.nickname}</td>
                <td>{item.weight}</td>
                <td>{item.height}</td>
                <td>{item.bodytemperature}</td>
                <td>{item.bloodpressure}</td>
                <td>
                  <pre>{item.symptoms}</pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-primary" onClick={getFormData}>
            Get Data
          </button>
          <button className="btn btn-success float-right" onClick={viewForm}>
            View Assessment Form
          </button>
        </div>
      </div>
    </div>
  );
}
export default Submissions;
