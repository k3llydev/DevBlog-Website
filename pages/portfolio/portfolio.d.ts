interface MongoPortfolioLink {
    label: string;
    link: string;
}

interface ProjectModel {
    title: string,
    description: string,
    techStack: string[],
    published_date: string,
    links: MongoPortfolioLink[]
}

interface PortfolioProps extends Page.StaticGenericProps {
    elements: ProjectModel[];
}

interface ProjectProps {
    project: ProjectModel;
    content: string;
}
