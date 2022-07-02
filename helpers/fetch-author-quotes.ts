export const fetchAuthorQuotes = async(
    author: string
) => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}?author=${author}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        return {
            success: true,
            data: data.data
        };
    }
    catch(error){
        console.log(error);

        return {
            success: false,
            error: `${error}`
        };
    }
}