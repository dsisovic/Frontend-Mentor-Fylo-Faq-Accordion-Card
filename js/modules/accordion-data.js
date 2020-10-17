export class AccordionData {

    constructor() { }

    getAccordionContent() {
        return [
            {
                headerName: 'How many team members can I invite?',
                accordionContent: 'You can invite as much as team members as you can.',
                id: 1
            },
            {
                headerName: 'What is the maximum file upload size?',
                accordionContent: 'No more than 2 GB. All files in your account must fit your alloted storage space.',
                id: 2
            },
            {
                headerName: 'How do I reset my password?',
                accordionContent: 'If you go to "Reset password" page, you can find it for yourself.',
                id: 3
            },
            {
                headerName: 'Can I cancel my subscription?',
                accordionContent: 'Yes, anytime you feel free, you can do it.',
                id: 4
            },
            {
                headerName: 'Do you provide additional support?',
                accordionContent: 'No, sorry you get nothing.',
                id: 5
            }
        ]
    }
}

export default new AccordionData();