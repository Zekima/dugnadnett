"use server"

import {db} from '@/lib/db'

export const getCategories = async () => {
    return db.category.findMany();
}