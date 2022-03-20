// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { request } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'
import { stringify } from 'querystring'

type Data = {
  conversion: string
}
//have roman numerals and their integer values hardcoded to use for conversion functions
const romanValues: object = {'M':1000, "CM": 900, "D": 500, "CD": 400, "C": 100, "XC": 90, "L": 50, 
"XL": 40, "X": 10, "IX": 9, "V": 5, "IV":4, "I":1}
//have the numerals in an array in descending order so we can look through them to convert an integer to numeral
const romanNumerals = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]

//this function will convert integers to Roman Numerals by looping over the each Roman Numeral 
//and adding it to the new Numeral if it is lower than or equal to the given integer, 
//then subtracting the value of that numeral, until we get to zero
const convertToRoman = (num) => {
  let newRomanNumeral: string = ''
  for(let numeral of romanNumerals) {
    console.log(numeral)
    while(num >= romanValues[numeral]) {
      newRomanNumeral = newRomanNumeral + numeral
      num -= romanValues[numeral]
    }
  }
  return newRomanNumeral
}

const convertToNum = (string) => {
let romanValuesAlreadyChecked = {}
let num = 0
let index = 0
for (let letter in string) {
  if (string[index+1] in romanValuesAlreadyChecked) {
    num -= romanValues[letter]
  } else {
    num += romanValues[letter]
  }
  romanValuesAlreadyChecked[letter] = romanValues[letter]
  index ++
}
return num
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let response = {conversion: ''}
  if (req.query.conversionType == 'toRoman') {
    response.conversion = convertToRoman(req.body.convertible)
    console.log(convertToRoman(req.body.convertible))
  } else {
    response.conversion = convertToNum(req.body.convertible).toString()
  }
  res.status(200).json(response)
}
