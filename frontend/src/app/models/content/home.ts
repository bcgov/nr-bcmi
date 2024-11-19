import { FeatureBlock } from "./feature-block"

// When adding new properties to this class, edit the query in /src/app/services/content-resolver.ts to include the new property
export class Home {
    Title: string
    Description: string
    About: string
    Mining_blocks: FeatureBlock[]
    Processes_blocks: FeatureBlock[]
  }
  