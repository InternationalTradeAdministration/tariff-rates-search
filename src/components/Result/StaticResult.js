import { isEmpty, map, omit } from '../../utils/lodash';
import React, { PropTypes } from 'react';
import './Result.scss';

export const CanadaResult = () => {
	return(
		<div className="explorer__result">
			<h3>Canada</h3>
			<p>{CanadaText}<a target="_blank" href="http://www.fas.usda.gov/topics/nafta">information from USDA.</a></p>
			<MoreInformation />
		</div>
	);
}

export const MexicoResult = () => {
	return(
		<div className="explorer__result">
			<h3>Mexico</h3>
			<p>{MexicoText}</p>
			<MoreInformation />
		</div>
	);
}

const MoreInformation = () => {
	return (
		<div>
			<p>For more information on NAFTA:</p>
			<ul>
				<li><a target="_blank" href="https://www.nafta-sec-alena.org/Home/About-the-NAFTA-Secretariat">The NAFTA Secretariat</a></li>
				<li><a target="_blank" href="http://tcc.export.gov/Trade_Agreements/Exporters_Guides/List_All_Guides/NAFTA_guides.asp">The Trade Compliance Center - NAFTA Guides</a></li>
				<li><a target="_blank" href="http://www.ustr.gov/trade-agreements/free-trade-agreements/north-american-free-trade-agreement-nafta">The Office of the U.S. Trade Representative</a></li>
			</ul>
			<p>
				<a href="https://ustr.gov/trade-agreements/free-trade-agreements/united-states-mexico-canada-agreement">United States-Mexico-Canada Agreement</a> rates coming soon.
			</p>
		</div>
	);
}

const MexicoText = "The North American Free Trade Agreement between the United States, Canada, and Mexico entered into force on January 1, 1994. Under NAFTA, trade in all goods between the United States and Mexico became duty-free on January 1, 2008.";
const CanadaText = "The North American Free Trade Agreement between the United States, Canada, and Mexico entered into force on January 1, 1994. Under NAFTA, trade in all industrial goods between the United States and Canada became duty-free on January 1, 2008. For further information on Canada's agricultural commitments please see ";
