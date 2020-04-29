import React, { useEffect, useRef } from "react";

import "./App.css";
import "formiojs/dist/formio.full.css";
import { Formio } from "formiojs";
import { useHistory } from "react-router-dom";

function Form() {
  const history = useHistory();
  const formioRef = useRef(null);
  const url =
    window.location.href.indexOf("adventmedia") > 0
      ? "http://formio.adventmedia.net/ws/submissions.php"
      : "http://formio/ws/submissions.php";
  useEffect(() => {
    if (formioRef.current) {
      Formio.createForm(
        formioRef.current,
        "https://sjmdhdlidptuwxm.form.io/healthstatus/submission"
      ).then(form => {
        form.nosubmit = true;
        form.on("submit", (submission: any) => {
          const symptoms = [];
          for (let key in submission.data.symptoms) {
            if (submission.data.symptoms.hasOwnProperty(key)) {
              if (submission.data.symptoms[key]) {
                symptoms.push(key);
              }
            }
          }
          submission.data.symptoms = symptoms.join(",");
          return fetch(url, {
            body: JSON.stringify(submission),
            headers: {
              "content-type": "application/json"
            },
            method: "POST",
            mode: "cors"
          }).then((response: any) => {
            form.emit("submitDone", submission);
            console.log("response:", response);
          });
        });
      });
    }
  }, [formioRef]);

  const viewSubmissions = () => {
    history.push('/submissions');
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="text-center">Form.io Sample</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div ref={formioRef} id="formio"></div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button className="btn btn-success" onClick={viewSubmissions}>View Submitted Assessments</button>
        </div>
      </div>
    </div>
  );
}

export default Form;
