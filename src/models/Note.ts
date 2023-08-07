
export type CategoryType = "Task" | "Random Thought" | "Idea";

export class Note {
    textContent: string;
    category: CategoryType;
    timeOfCreation: Date;
    id: number;
    isArchived:boolean;

    constructor(id: number, textContent: string, category: CategoryType, timeOfCreation: Date) {
        this.id = id;
        this.textContent = textContent;
        this.category = category;
        this.timeOfCreation = timeOfCreation;
        this.isArchived=false;
    }

    getMentionedDates() {

        let mentionDates = "";
        let dates = [...this.textContent.matchAll(/\d{1,2}\/([0-9]|1[12])\/\d{4}/gm)];
        for (let i = 0; i < dates.length; i++) {
            mentionDates += dates[i][0];
            mentionDates += i == dates.length - 1 ? "" : ", ";
        }
        return mentionDates;
    }

    getTextContent(): string {
        return this.textContent;
    }

    getCategory(): CategoryType {
        return this.category;
    }

    getTimeOfCreation(): string {
        return this.timeOfCreation.toLocaleString();
    }

    getId(): number {
        return this.id;
    }
    getIsArchived(){
        return this.isArchived;
    }

    setIsArchived(isArchived:boolean){
        this.isArchived=isArchived;
    }

    setTextContent(textContent: string) {
        this.textContent = textContent;
    }

    setCategory(category: CategoryType) {
        this.category = category;
    }

    setTimeOfCreation(timeOfCreation: Date) {
        this.timeOfCreation = timeOfCreation;
    }
}

