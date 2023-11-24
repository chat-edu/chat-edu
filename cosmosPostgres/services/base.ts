import {getPool} from "@/cosmosPostgres/citus";

import {QueryResultRow} from "pg";

export const find = async <RowType extends QueryResultRow, ReturnType>(
    queryText: string,
    values: any[],
    transform: (row: RowType) => ReturnType
): Promise<ReturnType[]> => {
    const client = await getPool().connect();
    try {
        const { rows } = await client.query<RowType>(queryText, values);
        return rows.map(transform);
    } finally {
        client.release();
    }
};

export const add = async (tableName: string, input: object): Promise<boolean> => {
    const client = await getPool().connect();
    try {
        const columns = Object.keys(input).join(', ');
        const values = Object.values(input);
        const valuePlaceholders = values.map((_, index) => `$${index + 1}`).join(', ');

        const queryText = `INSERT INTO ${tableName} (${columns}) VALUES (${valuePlaceholders}) RETURNING *`;
        await client.query(queryText, values);
        return true;
    } catch (error) {
        console.error('Error in add operation:', error);
        return false;
    } finally {
        client.release();
    }
};

export const update = async(
    tableName: string,
    id: string | number,
    updatedFields: object,
    idColumnName: string = 'id'
): Promise<boolean> => {
    const client = await getPool().connect();
    try {
        const updates = Object.keys(updatedFields).map((key, index) => `${key} = $${index + 1}`);
        const values = [...Object.values(updatedFields), id];
        const queryText = `UPDATE ${tableName} SET ${updates.join(', ')} WHERE ${idColumnName} = $${values.length}`;

        await client.query(queryText, values);
        return true;
    } catch (error) {
        console.error('Error in update operation:', error);
        return false;
    } finally {
        client.release();
    }
};

export const get = async <RowType extends QueryResultRow, ReturnType>(
    tableName: string,
    id: string | number,
    transform: (row: RowType) => ReturnType,
    idColumnName: string = 'id'
): Promise<ReturnType | null> => {
    const client = await getPool().connect();
    try {
        const queryText = `SELECT * FROM ${tableName} WHERE ${idColumnName} = $1`;
        const { rows } = await client.query<RowType>(queryText, [id]);
        return rows && rows.length ? transform(rows[0]) : null;
    } finally {
        client.release();
    }
};

export const del = async (
    tableName: string,
    id: string | number,
    idColumnName: string = 'id'
): Promise<boolean> => {
    const client = await getPool().connect();
    try {
        const queryText = `DELETE FROM ${tableName} WHERE ${idColumnName} = $1`;
        await client.query(queryText, [id]);
        return true;
    } catch (error) {
        console.error('Error in delete operation:', error);
        return false;
    } finally {
        client.release();
    }
};