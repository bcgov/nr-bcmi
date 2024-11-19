import { HeaderButton } from "./header-button"

// When adding new properties to this class, edit the query in /src/app/services/content-resolver.ts to include the new property
export class Page {
    Title: string
    Description: string
    Header_button: HeaderButton[] // strapi doesn't allow renaming :( I wish I could add an s
    Content: string
    // If you're adding a new sidecard variable, please add it to the isTwoColumn conditional as well!
    Ongoing_card: string
    External_card: string
    Related_card: string
    Enforcement_Actions_card: string
    route: string
    tooltip: string
  }
  