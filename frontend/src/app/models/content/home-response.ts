import { FastFact } from "./fast-fact";
import { Home } from "./home";

export class HomeResponse{
    home: Home
    facts: FastFact[]

    constructor(){
        //Loads defaults incase the CMS fails to load
        this.home = new Home();
        this.home.Title = "British Columbia Mine Information"
        this.home.Description = "Mining is one of British Columbia’s oldest and most dynamic industries. The Province of British Columbia is committed to continuing to provide effective oversight of this important sector."
        this.home.About = '<section class="about-info mb-0"><h2>About BC Mine Information</h2><p>The Ministry of Energy, Mines, and Low Carbon Innovation (EMLI), Ministry of Environment and Climate Change Strategy (ENV) and Environmental Assessment Office (EAO) have collaborated to make information on the Province’s oversight of major mines in British Columbia more accessible than ever before.</p><p>This is the first time mine-related information from all three agencies has been made available online in one place, and more information will be added on an ongoing basis.</p><p>This site currently profiles 78 major mines across the province. Information on these mines will be continually added to the website, and other permitted major mines in BC will be added in the coming months.</p></section>'
    }
}