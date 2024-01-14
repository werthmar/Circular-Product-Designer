import { List, Navbar, NavbarBrand } from "reactstrap";
import { BsHouse } from 'react-icons/bs';
import { useEffect } from "react";

export default function Impressum()
{
    useEffect(() =>
    {        
        document.body.classList.add("impressum");
    });

    return(
        <div className="impressumPage">

            <Navbar
                className="fixed-top"
                color="warning"
                dark
            >
                <NavbarBrand href="/">
                    <BsHouse className="d-inline-block align-top" size={30} color="white"></BsHouse>
                    Home
                </NavbarBrand>
            </Navbar>

            <div className="textDiv">

                <h1>Impressum</h1>

                <p>Für die Inhalte der Domain www.circularity-navigator.com ist aus Sicht des § 5 TMG verantwortlich:</p>

                <h4>Design und Texte:</h4>
                <ul>
                    <li>Hochschule Pforzheim - Gestaltung, Technik, Wirtschaft und Recht</li>
                    <li>vertreten durch den Rektor Professor Dr. Ulrich Jautz</li>
                    <li>E-Mail: <a>rektorat@hs-pforzheim.de</a></li>    
                </ul>
                

                <ul title="Kontakt">
                    <li>Tiefenbronner Straße 65</li>
                    <li>75175 Pforzheim</li>
                    <li>Tel.: 07231 - 28 5</li>
                    <li>Fax: 07231 - 28 6666</li>
                    <li>E-Mail: <a>info@hs-pforzheim.de</a></li>
                </ul>

                <p>Die Hochschule Pforzheim ist eine rechtsfähige Körperschaft des öffentlichen Rechts und zugleich staatliche Einrichtung; ihr ist das Recht zur Selbstverwaltung im Rahmen der Gesetze verliehen (§8 LHG - Landeshochschulgesetz)
                Aufsichtsbehörde ist nach §67 LHG das Ministerium für Wissenschaft, Forschung und Kunst Baden-Württemberg.</p>

                <p>Umsatzsteuer-Identifikationsnummer: DE 811470663</p>
                
                <h4>Technische Umsetzung:</h4>
                <p>Deutsches Forschungszentrum für Künstliche Intelligenz GmbH (DFKI)</p>

                <ul title="Geschäftsführung:">
                    <li>Prof. Dr. Antonio Krüger</li>
                    <li>Helmut Ditzer</li>
                </ul>

                <ul>
                    <li>Trippstadter Str. 122</li>
                    <li>67663 Kaiserslautern</li>
                    <li>Tel.: +49 631 20575 0</li>
                    <li>E-Mail:<a>info@dfki.de</a></li>
                </ul>

                <ul title="Verantwortliche Stelle:">
                    <li>Prof. Dr. Oliver Thomas</li>
                    <li>Forschungsbereich Smart Enterprise Engineering</li>
                    <li>Hamburger Straße 24</li>
                    <li>49084 Osnabrück</li>
                    <li>Tel. +49 541 386050 4814</li>
                    <li>E-Mail:<a>smart-enterprise@dfki.de</a></li>
                </ul>

                <ul>
                    <li>Registergericht: Amtsgericht Kaiserslautern</li>
                    <li>Registernummer: HRB 2313</li>
                    <li>ID-Nummer: DE 148 646 973</li>
                </ul>

                <br/>
                <h4>Rechtliche Hinweise zur Haftung für eigene Inhalte</h4>
                <p>
                    Die Deutsches Forschungszentrum für Künstliche Intelligenz GmbH (DFKI) ist als Inhaltsanbieterin gemäß § 7 Abs. 1 Telemediengesetz (TMG) für die eigenen Inhalte, die zur Nutzung bereitgehalten werden, nach den allgemeinen Gesetzen verantwortlich.
                    <br/><br/>
                    Das DFKI ist um Korrektheit und Aktualität der auf dieser Internetpräsenz bereitgestellten Informationen bemüht. Dennoch ist ein vollständiger Ausschluss von Fehlern und Unklarheiten nicht möglich. Das DFKI übernimmt daher keine Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Für Schäden materieller oder ideeller Art, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen resp. durch die Nutzung fehlerhafter und unvollständiger Informationen unmittelbar oder mittelbar verursacht werden, haftet das DFKI nicht, sofern nicht nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt. Dies bezieht sich auch auf für zum Download bereitgestellte Software oder Daten.
                    <br/><br/>
                    Dem DFKI ist es vorbehalten, Teile des Internetangebots oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
                    Rechtliche Hinweise für Verweise auf externe Webseiten
                    <br/><br/>
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                    <br/><br/>
                    Unser Angebot enthält Links zu externen Webseiten Dritter. Für diese Inhalte der verlinkten externen Seiten ist stets der jeweilige Anbieter verantwortlich. Für die Inhalte der verlinkten Seiten können wir keine Gewähr übernehmen. Diese fremden Inhalte wurden vonseiten des DFKI bei der erstmaligen Link-Setzung daraufhin überprüft, ob etwaige Rechtsverstöße bestehen. Zum Zeitpunkt der Überprüfung waren keine Rechtsverstöße ersichtlich. Es ist jedoch nicht auszuschließen, dass die Inhalte im Nachhinein von den jeweiligen Anbietern verändert werden. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Sollten Sie der Ansicht sein, dass die verlinkten externen Seiten gegen geltendes Recht verstoßen oder sonst unangemessene Inhalte haben, so teilen Sie uns dies bitte direkt an: info@dfki.de mit.
                    <br/><br/>
                    Sollte das DFKI feststellen oder einen Hinweis darauf erhalten, dass ein externes Angebot, auf das es verlinkt hat, eine zivil- oder strafrechtliche Verantwortlichkeit auslöst, wird das DFKI den Link auf dieses Angebot unverzüglich aufheben.
                    Rechtliche Hinweise zum Urheberrecht
                    <br/><br/>
                    Das Layout der Homepage, die verwendeten Grafiken sowie die sonstigen Inhalte der Internetpräsenz des DFKI sind urheberrechtlich geschützt. Die Vervielfältigung, Bearbeitung, Verbreitung und jedwede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der Zustimmung des DFKI (in Schriftform). Soweit die Inhalte auf dieser Seite nicht von DFKI erstellt wurden, werden die Urheberrechte Dritter beachtet. Sollten Sie dennoch auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen, wird DFKI derartige Inhalte umgehend entfernen.
                </p>
            </div>

        </div>
    );
}