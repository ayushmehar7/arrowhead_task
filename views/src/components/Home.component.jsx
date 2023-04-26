import { Fragment } from "react"
import { MovieNavbar } from "./Navbar.component"
import { MovieList } from "./MovieList.component"

export const Home = ()=> {

    return(
        <Fragment>
            <MovieNavbar />
            <MovieList />
        </Fragment>
    )
}