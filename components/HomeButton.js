/**
 * The home button can either be big (for homescreen) or small (for footer)
 * Input:
 * - String size -> either "big" or "small"
 */

import { Button } from "reactstrap";
import { BsHouse } from 'react-icons/bs';
import Link from "next/link";

export default function HomeButton(props) {
    function decideSize( size ) {
        return size=="small" ? 30 : 70;
    }
    
    return (
        <Link href="/">
            <Button className={'homeButton ' + props.size} >
                <BsHouse size={decideSize(props.size)} />
            </Button>
        </Link>
    )
}