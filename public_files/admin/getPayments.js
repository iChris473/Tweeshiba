
    const paymntData = document.querySelector('.paymntData')

    async function getPaymentList() {

        try{
    
        //   const response = await fetch(`https://account-api.nowpayments.io/payments`, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "authorization":"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3OTgxMTk4MTgiLCJzZXNzaW9uSWQiOiIxMjc4MzgiLCJpYXQiOjE2NTkxNDEzNDYsImV4cCI6MTY1OTE4NDU0Nn0.x46IK8pDodU6B38ckVQANwOCDf1h5mckFJJ0JPGOjSw"
        //     }
        // });
        let response = await fetch(`https://api.nowpayments.io/v1/payment/?limit=500&page=0&sortBy=created_at&orderBy=desc&dateFrom=2022-01-01&dateTo=2025-01-01`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "x-api-key":"V524A6R-KZ6M285-PP6NAPY-HNKPXCE",
              "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3OTgxMTk4MTgiLCJzZXNzaW9uSWQiOiIxMzYzODAiLCJpYXQiOjE2NjA1MDM4MjEsImV4cCI6MTY2MDU0NzAyMX0.wDQ6eiCmUoxLL_X_Zf-eCXr2qwZ-9ytyu_IUM5mfKg8"
          }
      });
        
    
          const resData =  await response.json();
          //   console.log(resData)
          const mainList = resData.data.filter(list => (list.payment_status == "finished") || (list.payment_status == "partially_paid"))
          // const mainList = user.payments.filter(pay => (pay.status === 'finished') || (pay.status == 'partially_paid') );
          console.log(mainList)
          
          paymntData.innerHTML = mainList.length
    
        }catch(err){
          console.log(err);
        }
  
    }

    getPaymentList()