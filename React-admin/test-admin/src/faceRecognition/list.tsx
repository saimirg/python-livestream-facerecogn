import { List, Datagrid, TextField, useRecordContext, FunctionField, DeleteButton, ShowButton, TextInput, Filter, Pagination,DateField} from "react-admin";
import { render } from "react-dom";
import MyUrlField from "./MyUrlField";

const RenderIcon = () => {
    const record = useRecordContext()
    if (!record) return null;
    const imageUrl = record.image ? `data:image/jpeg;base64,${record.image}` : '';
    const imageStyle = {
        width: 70,
        height: 70,
        borderRadius: '50%',
    };
    return <img src={imageUrl} alt={record.image} style={imageStyle} />;
};

// const PostPagination = () => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />;

const ListFilters = (props: any) => (
    <Filter {...props}>
        <TextInput
            sx={{ mb: 2, mt: 2 }}
            resettable
            label="Name"
            source= "name_name"
            alwaysOn
        />
        <TextInput
            sx={{ mb: 2, mt: 2 }}
            resettable
            label="Date(MM/DD/YYYY)"
            source="name_date"
        />
        <TextInput
            sx={{ mb: 2, mt: 2 }}
            resettable
            label="TV Channel"
            source="name_tvChannel"
        />
    </Filter>
)

const MyResourceList = () => {
    const handleRowClick = (id: any, basePath: any, record: any) => {
        const name = record.name ? encodeURIComponent(record.name) : 'NoName';
        const date = record.date ? encodeURIComponent(record.date) : 'NoDate';
        return `/charts/${id}/${name}/${date}`;
    };

    return (
        <List filters={<ListFilters />} perPage={10} sort={{field: 'timestamp2', order:'DESC'}} //pagination={<PostPagination />}
        >
            <Datagrid rowClick={handleRowClick}>
                <FunctionField label="Image" render={() => <RenderIcon />} />
                {/* <TextField source="filename" /> */}
                <TextField source="tvChannel" />
                <TextField source="name" />
                {/* <FunctionField
                    label="Name"
                    render={(record: any) => (
                        record.firstsubject.subject
                    )}
                /> */}
                {/* <TextField source="timestamp"/> */}
                {/* <TextField source="timestamp2"/> */}
                {/* <TextField source="date" /> */}
                {/* <TextField source="time" /> */}
                {/* <TextField source="month" /> */}
                {/* <TextField source="year" /> */}
                <DateField label='Timestamp' source="timestamp2" showTime />
                <FunctionField
                    label="Similarity"
                    render={(record: any) => `${(record.firstsubject.similarity*100).toFixed(2)}%`}
                />
                {/* <TextField source="timestamp" /> */}
                {/* <FunctionField
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
                /> */}
                <ShowButton label="See Details" />
                <MyUrlField />
                {/* <DeleteButton /> */}
            </Datagrid>
        </List>
    );
};
export default MyResourceList;

