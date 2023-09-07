import { expect, Page } from "@playwright/test";

export default class utils {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    public async isVariableEmpty(variable: any): Promise<boolean> {
        return variable === undefined || variable === null || variable === '';
    }
    

}