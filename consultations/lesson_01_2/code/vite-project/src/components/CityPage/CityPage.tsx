import type { JSX } from 'preact';
import style from "./CityPage.module.css"
import auto from "./img/1200x900.jpeg"

export const CityPage = (): JSX.Element => {
  return (
    <div className={style.cityClass}>
      <h2>Все о городе</h2>
      <p>
        Belm ist eine Gemeinde im Landkreis Osnabrück in Niedersachsen. Belm
        gehört als Vorortgemeinde der Stadt Osnabrück zum Ballungsraum
        Osnabrück.
      </p>
      <h3>Belm</h3>
      <p>
        Der heutige Ortskern Belm, der der Gemeinde ihren Namen gab, entstand
        aus der Fusion der Gemeinden (Alt-)Belm und Powe. Er ist der
        einwohnermäßig größte Ortsteil der Gemeinde, hier befindet sich auch das
        eigentliche Gemeindezentrum mit Rathaus, Schul- und Sportzentrum,
        Geschäften, Einkaufszentren, Industrie- und Handwerksbetrieben. Der Ort
        wurde bis zur Fertigstellung der Ortsumgehung im Jahre 2019 von
        Nordosten nach Südwesten von der Bundesstraße 51 geteilt. In diesem
        Bereich haben sich ein Großteil der Industriebetriebe und
        Einkaufszentren angesiedelt, während sich südlich davon die Wohngebiete
        mit allen kulturellen und sozialen Einrichtungen sowie kleineren
        Geschäften und Restaurants ausbreiten. Der Marktplatz vor dem Rathaus
        ist alljährlich im Sommer acht Wochen lang Schauplatz des Belmer
        Kultursommers sowie des jeden Donnerstag stattfindenden Wochenmarktes.
      </p>
      <img
        className={style.imageClass}
        src='https://images.noz-mhn.de/img/22584519/crop/cbase_16_9-w910-h511/1026248342/2095566228/72b0bfda5fb7aa259a1fba74a5a650d3.webp'
        alt='Belm-Powe: In 16 Jahren vom „Getto“ in die Normalität'
      />
      <h3>Importiertes Bild</h3>
      <img src={auto} alt='Porsche' />
      <img src="20243.png" alt='Porsche' />
    </div>
  );
};
