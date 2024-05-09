import { Show, SimpleShowLayout, TextField, FunctionField } from 'react-admin';


const MyShow = (props:any) => (
    <Show {...props} title='All Details'>
        <SimpleShowLayout>
            <TextField source="id" />
            <FunctionField
                    label="Details"
                    render={(record: any) => (
                        <div>
                            Name: {record.firstsubject.subject}<br />
                            Similarity: {(record.firstsubject.similarity * 100).toFixed(2)}%
                        </div>
                    )}
                />
            <TextField source="filename" />
            <TextField source="tvChannel" />
            <TextField source="date" />
            <TextField source="time" />
            {/* <TextField source="timestamp" /> */}
            {/* <TextField source="timestamp2" /> */}
            <FunctionField
                    label="Age"
                    render={(record: any) => `${record.age.high}`}
                />
                <FunctionField
                    label="Gender"
                    render={(record: any) => `${record.gender.value}`}
                />
                <FunctionField
                    label="Pose"
                    render={(record: any) => (
                        <div>
                            Pitch: {record.pose.pitch}<br />
                            Roll: {record.pose.roll}<br />
                            Yaw: {record.pose.yaw}
                        </div>
                    )}
                />
        </SimpleShowLayout>
    </Show>
);
export default MyShow






