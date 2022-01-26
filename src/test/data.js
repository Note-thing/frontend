const DEFAULT_MOCK_DATA = {
    directory: {
        id: 1,
        title: 'occipital',
        created_at: '2021-12-28T15:15:19.000Z',
        updated_at: '2021-12-28T15:15:19.000Z',
        user_id: 1,
        notes: [
            {
                id: 5,
                title: 'secondhand4545',
                body: '# Getting Started with Create React App',
                created_at: '2021-12-28T15:15:20.000Z',
                updated_at: '2021-12-30T20:35:02.000Z',
                folder_id: 1,
                tags: [
                    {
                        id: 6,
                        title: 'test2',
                        created_at: '2022-02-02T00:00:00.000Z',
                        updated_at: '2022-02-02T00:00:00.000Z',
                        note_id: 10
                    },
                    {
                        id: 7,
                        title: 'test3',
                        created_at: '2022-02-02T00:00:00.000Z',
                        updated_at: '2022-02-02T00:00:00.000Z',
                        note_id: 10
                    }
                ]
            }
        ]
    },
    note: {
        id: 5,
        title: 'secondhand4545',
        body: '# Getting Started with Create React App',
        created_at: '2021-12-28T15:15:20.000Z',
        updated_at: '2021-12-30T20:35:02.000Z',
        folder_id: 1,
        reference_note: null,
        tags: [
            {
                id: 6,
                title: 'test2',
                created_at: '2022-02-02T00:00:00.000Z',
                updated_at: '2022-02-02T00:00:00.000Z',
                note_id: 10
            },
            {
                id: 7,
                title: 'test3',
                created_at: '2022-02-02T00:00:00.000Z',
                updated_at: '2022-02-02T00:00:00.000Z',
                note_id: 10
            }
        ]
    },
    directories: [
        {
            id: 1,
            title: 'occipital',
            created_at: '2021-12-28T15:15:19.000Z',
            updated_at: '2021-12-28T15:15:19.000Z',
            user_id: 1,
            notes: [
                {
                    id: 5,
                    title: 'secondhand4545',
                    body: '# Getting Started with Create React App',
                    created_at: '2021-12-28T15:15:20.000Z',
                    updated_at: '2021-12-30T20:35:02.000Z',
                    folder_id: 1,
                    tags: [
                        {
                            id: 6,
                            title: 'test1',
                            created_at: '2022-02-02T00:00:00.000Z',
                            updated_at: '2022-02-02T00:00:00.000Z',
                            note_id: 10
                        },
                        {
                            id: 7,
                            title: 'tag1',
                            created_at: '2022-02-02T00:00:00.000Z',
                            updated_at: '2022-02-02T00:00:00.000Z',
                            note_id: 10
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: 'malburner',
            created_at: '2021-12-28T15:15:19.000Z',
            updated_at: '2021-12-28T15:15:19.000Z',
            user_id: 1,
            notes: [
                {
                    id: 2,
                    title: 'main agenda',
                    body: '# Getting Started with Create React App',
                    created_at: '2021-12-28T15:15:20.000Z',
                    updated_at: '2021-12-30T20:35:02.000Z',
                    folder_id: 1,
                    tags: [{
                        id: 6,
                        title: 'test2',
                        created_at: '2022-02-02T00:00:00.000Z',
                        updated_at: '2022-02-02T00:00:00.000Z',
                        note_id: 10
                    }]
                },
                {
                    id: 3,
                    title: 'éééééééé',
                    body: '# Getting Started with Create React App',
                    created_at: '2021-12-28T15:15:20.000Z',
                    updated_at: '2021-12-30T20:35:02.000Z',
                    folder_id: 1,
                    tags: [{
                        id: 6,
                        title: 'INF1',
                        created_at: '2022-02-02T00:00:00.000Z',
                        updated_at: '2022-02-02T00:00:00.000Z',
                        note_id: 10
                    }]
                }
            ]
        }
    ]
};

export default DEFAULT_MOCK_DATA;
