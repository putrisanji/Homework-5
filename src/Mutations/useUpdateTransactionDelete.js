import { useMutation } from "react-query"

// const cookies = new Cookies();

const useUpdateTransactionsDelete = (updateId, onSuccess, onError) => {
  const { mutate, data, isLoading, isError } = useMutation(
    async () => {
      const response = await fetch(`http://localhost:5000/transactions/${updateId}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
          // "Authorization": "Bearer " + cookies.get("accessToken"),
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({status:2}),
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    },
    { onError, onSuccess }
  )

  return { mutate, data, isLoading, isError }
}

export default useUpdateTransactionsDelete