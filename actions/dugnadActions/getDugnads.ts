import {db} from '@/lib/db'
import { off } from 'process';

export const getDugnads = async () => {
    return db.dugnad.findMany({
        include: {
            categories: true,
        }
    });
}

const ITEMS_PER_PAGE = 9;

export const getFilteredDugnads = async (query: string, currentPage: number, sort: string) => {

    const sortBy = {
        'publisert': 'asc',
        'eldste': 'desc'
    }

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
        return db.dugnad.findMany({
            where: {
                title: {
                    contains: query,
                    mode: 'insensitive',
                },
            },
            skip: offset,
            take: ITEMS_PER_PAGE,
            include: {
                categories: true,
            },            
            orderBy: {
                //@ts-ignore
                createdAt: sortBy[sort] || 'asc',
            }
        });
    } catch(error) {
        console.error("getFilteredDugnads Error: ", error)
    }
}


export async function getDugnadsPages(query: string) {
    try {
        const totalRecords = await db.dugnad.count({
            where: {
                title: {
                    contains: query,
                    mode: 'insensitive',
                },
            },
        });

        const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);

        return totalPages;
    } catch (error) {
        console.error("getDugnadsPages Error: ", error)
    }
}