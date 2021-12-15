import classnames from 'classnames';
import { fetchRoots, fetchTabContent } from '../actions';
import sentenceCase from 'sentence-case';
import {
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
} from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "react-loader-spinner";
import './styles.css';
import { RootState } from '../reducers';
import { FETCH_ROOTS_FAILURE } from '../constants';

const Home: React.FC = () => {
	const dispatch = useDispatch();
	const [tab, setTab] = useState(void 0);
	const roots: any = useSelector((state: RootState) => state.roots);
	const rootcontent : any = useSelector((state: RootState) => state.rootcontent);
	const [payloadValues, setPayloadValues] = useState([{}]);


	useEffect(() => {
		dispatch(fetchRoots());
	}, [dispatch]);

	useEffect(() => {
		if (rootcontent.content)
			setPayloadValues(rootcontent.content.results)
	}, [rootcontent]);


	const keys = Object.keys(roots.payload || {});

	const handleTabContent = (event: any) => {
		setTab(event);
		dispatch(fetchTabContent(event));
	}

	const isValidURL = (string: any) => {
		if (typeof string === 'string' || string instanceof String) {
			var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
			return (res !== null)
		}

	};

	return (
		<div>
			<h1>{'My little Star Wars app 👾'}</h1>
			{roots.error &&
			(
				<div className='api-fail'>{FETCH_ROOTS_FAILURE}</div>
			)}

			{roots.payload && (
				<div className={'mt-3'}>
					<Nav tabs>
						{keys.map(k => (
							<NavItem key={k}>
								<NavLink
									className={classnames({ active: tab === k })}
									onClick={() => handleTabContent(k)}
								>
									{sentenceCase(k)}
								</NavLink>
							</NavItem>
						))}
					</Nav>

					<TabContent activeTab={tab}>
						{keys.map(k => (
							<TabPane
								key={k}
								tabId={k}
							>
								{rootcontent.isLoading ? <div className="spinner"><Loader
									type="BallTriangle"
									color="#00BFFF"
									height={100}
									width={100}
								/> </div> :
									<table>
										<thead>
										<tr>
											{Object.keys(payloadValues[0]).map((key) => (
												<th key={null}>{key}</th>
											))}
										</tr>
										</thead>
										{payloadValues.map((item) => (
											<tbody key={null}>
											<tr key={null}>
												{Object.values(item).map((val: any) => (
													Array.isArray(val) ? <td key={null}> {val.map((item, index) =>
														isValidURL(item) ? <li key={index}><a href={item}>{item}</a></li> :
															<li key={index}>{item}</li>
													)}</td> :
														isValidURL(val) ? <td key={null}><a href={val} target="_blank">{val}</a></td> : <td>{val}</td>
												))}
											</tr>
											</tbody>
										))}
									</table>
								}
							</TabPane>
						))}
					</TabContent>
				</div>
			)}
		</div>
	);
};

export default Home;
