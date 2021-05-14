import * as React from 'react';
import { Select, SelectInterface } from 'antd';
import { getPeopleList } from '@api/people';

type Params = SelectInterface & {
  placeholder: string;
  onChange?: (val: string) => void;
};
export const PeopleList = ({ placeholder, onChange, ...props }: Params) => {
  const [peopleList, setPList] = React.useState();

  React.useEffect(() => {
    getPeopleList({ limit: 0, offset: 0 }).then((res) => {
      setPList(res?.user.map((item) => ({ value: item.phone_number, label: item.name })) || []);
    });
  }, []);

  return (
    <Select
      placeholder={placeholder}
      options={peopleList}
      allowClear
      {...props}
      onChange={onChange ? onChange : undefined}
    />
  );
};

export default PeopleList;
