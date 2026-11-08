/// <reference types="vite/client" />

declare module "virtual:resume" {
  const resume: import("./schema").ResumeType;
  export default resume;
}
