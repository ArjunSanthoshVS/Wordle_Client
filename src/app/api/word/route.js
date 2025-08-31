import axios from 'axios';
import { NextResponse } from 'next/server';

const DICTIONARY_API_BASE = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const word = searchParams.get('word');

        if (!word) {
            return NextResponse.json({
                success: false,
                message: 'Word parameter is required'
            }, { status: 400 });
        }

        const response = await axios.get(`${DICTIONARY_API_BASE}/${word}`);
        const data = response.data[0];

        return NextResponse.json({
            success: true,
            data: {
                word: data.word,
                phonetic: data.phonetic,
                meanings: data.meanings
            }
        });
    } catch (error) {
        // If the error is 404, it means the word doesn't exist in dictionary
        if (error.response && error.response.status === 404) {
            return NextResponse.json({
                success: false,
                message: 'Not a valid English word'
            }, { status: 404 });
        }

        console.error('Error fetching word details:', error?.response?.data);
        return NextResponse.json({
            success: false,
            message: 'Error checking word'
        }, { status: 500 });
    }
}