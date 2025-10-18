export default {
    name:'certifications',
    title:'Certifications',
    type:'document',
    fields:[
        {
            name:'title',
            title:'Certification Title',
            type:'string'
        },
        {
            name:'issuer',
            title:'Issuing Organization',
            type:'string'
        },
        {
            name:'date',
            title:'Issue Date',
            type:'date'
        },
        {
            name:'expiryDate',
            title:'Expiry Date',
            type:'date'
        },
        {
            name:'credentialUrl',
            title:'Credential URL',
            type:'url'
        },
        {
            name:'description',
            title:'Description',
            type:'text'
        },
        {
            name:'skills',
            title:'Skills Covered',
            type:'array',
            of: [{type: 'string'}]
        },
        {
            name:'type',
            title:'Certification Type',
            type:'string',
            options: {
                list: [
                    {title: 'AI/ML', value: 'AI/ML'},
                    {title: 'Data Science', value: 'Data'},
                    {title: 'Programming', value: 'Programming'},
                    {title: 'Cloud/DevOps', value: 'DevOps'},
                    {title: 'Other', value: 'Other'}
                ]
            }
        }
    ]
}
