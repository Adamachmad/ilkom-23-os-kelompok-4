Sequel.migration do
    change do
        create_table :customers do
            primary_key :id
            String :name
            String :email
            Date :created_at
            Date :updated_at
        end
    end
end