/**
 * 
 * @param birthday 
 * @returns age
 * @description assumes that birthday is before current date
 */
export const getAge = (birthday: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }
    return age;
}

/**
 * 
 * @param height (e.g. "5'9")
 * @returns height in centimeters
 * @description Converts height from feet and inches to centimeters
 */
export const convertHeightToCm = (height: string) => {
    // TODO
}

/**
 * 
 * @param height (e.g. "175cm")
 * @returns height in feet and inches
 * @description Converts height from centimeters to feet and inches
 */
export const convertHeightToFeet = (height: string) => {
    // TODO
}