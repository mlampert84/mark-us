export interface SelectionType {
    name: string;
    color: string;
};

export interface Selection {
    type: SelectionType;
    id: string;
    begin: number;
    end: number;
}

