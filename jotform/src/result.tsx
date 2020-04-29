import React, { useEffect, useState } from 'react';
import './App.css';

interface IFormData {
	nickname: string;
	height: number;
	weight: number;
	temperature: number;
	symptoms: string;
}

export function Result() {
	const url = 'http://forms.adventmedia.net/webhooks/results.php';
	const [submittedForms, setSubmittedForms] = useState<IFormData[]>([]);
	const [formData, setFormData] = useState<IFormData[]>([]);

	useEffect(() => {
		if(submittedForms) {
			submittedForms.forEach(item => {
				item.symptoms = JSON.parse(item.symptoms).join('\n');
			});
			setFormData(submittedForms);
		}
	}, [submittedForms]);

	const getFormData = () => {
		fetch(url, {
			method: "GET",
		})
				.then(res => res.json())
				.then(result => {
					setSubmittedForms(result);
				});
	};

	return (
			<>
				<div className="getData">
					<button className="btn btn-primary" onClick={getFormData}>
						Get Data
					</button>
				</div>
				<div>
					<table className="table table-striped">
						<thead>
						<tr>
							<th>Nickname</th>
							<th>Weight</th>
							<th>Height</th>
							<th>Temperature</th>
							<th>Symptoms</th>
						</tr>
						</thead>
						<tbody>
						{formData.map((item, index) => (
								<tr key={index}>
									<td>{item.nickname}</td>
									<td>{item.weight}</td>
									<td>{item.height}</td>
									<td>{item.temperature}</td>
									<td>
										<pre>{item.symptoms}</pre>
									</td>
								</tr>
						))}
						</tbody>
					</table>
				</div>
			</>)
}
