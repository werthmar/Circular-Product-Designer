/**
 * The main page of the application. User chooses if they want to start with a product or
 * circular business model and are then guided through the process. The idea is that the entire
 * process can be done on this page with the page body switching without the need to switch the
 * entire page.
 */

 import LayoutFooterExtended from "../components/LayoutFooterExtended";

export default function ProcessPage() {
    return(
        <div>process</div>
    )
}

ProcessPage.getLayout = function getLayout(page) {
    return (
        <LayoutFooterExtended pageTitle="New Advisor Project">{page}</LayoutFooterExtended>
    )
  }