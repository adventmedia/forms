import React, { useEffect, useState } from "react";
import "./App.css";

interface IFormData {
  field: number;
  label: string;
  type: string;
  value: string;
}

function App() {
  const local = window.location.href.indexOf("localhost") >= 0;
  const token = !local
    ? "2cb2cc76a5aa53f334abce0011b3ee57"
    : "39a43227325b6a5e606e7c177fd8a858";
  const url =
    "https://www.formstack.com/api/v2/form/3849981/submission.json?data=true";
  const [submittedForms, setSubmittedForms] = useState<any>(null);
  const [formData, setFormData] = useState<IFormData[]>([]);
  const [count, setCount] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    const cnt =
      submittedForms && submittedForms.length ? submittedForms.length - 1 : 0;
    setCount(cnt);
    setIndex(cnt);
    currentItem(cnt);
  }, [submittedForms]);
  useEffect(() => {
    currentItem(index);
  }, [index]);

  const getFormData = () => {
    fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token}`
      })
    })
      .then(res => res.json())
      .then(result => {
        setSubmittedForms(result.submissions);
      });
  };

  const currentItem = (index: number) => {
    if (submittedForms) {
      const items = Object.entries(submittedForms[index].data);
      const data: IFormData[] = [];
      items.forEach(item => data.push(item[1] as IFormData));
      setFormData(data);
    }
  };

  const setPage = (index: number) => {
    setIndex(index);
  };
  const advancePage = (dir: number) => {
    const x = index + dir;
    if (x < 0) {
      return;
    }
    if (x > count) {
      return;
    }
    setPage(x);
  };

  const pageTab = (count: number) => {
    const tabs = [];
    for (let i = 0; i <= count; i++) {
      tabs.push(
        <li className={"page-item" + (index === i ? " active" : "")} key={i}>
          <a className="page-link" role="button" onClick={() => setPage(i)}>
            {i + 1}
          </a>
        </li>
      );
    }
    return tabs;
  };

  return (
    <>
      <div className="App">
        <header className="Form Viewer">Sample Form</header>
      </div>
      <div>
        <iframe
          className="formHolder"
          src="https://adventmedia.formstack.com/forms/health_survey"
          title="Health Survey"
          width="600"
          height="400"
        />
      </div>
      <div className="getData">
        <button className="btn btn-primary" onClick={getFormData}>
          Get Data
        </button>
      </div>
      <div>
        {count && (
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a
                  role="button"
                  className={"page-link" + (index === 0 ? " disabled" : "")}
                  onClick={() => advancePage(-1)}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {pageTab(count)}
              <li className="page-item">
                <a
                  role="button"
                  className={"page-link" + (index === count ? " disabled" : "")}
                  onClick={() => advancePage(1)}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <div>
        <table className="table table-striped">
          <tbody>
            {formData.map((item, index) => (
              <tr key={item.field}>
                <td>{item.field}</td>
                <td>{item.label}</td>
                <td>
                  <pre>{item.value}</pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
