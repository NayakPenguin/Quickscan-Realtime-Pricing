![GitHub top language](https://img.shields.io/github/languages/top/NayakPenguin/quickscan.svg?style=flat)
![GitHub last commit](https://img.shields.io/github/last-commit/NayakPenguin/quickscan.svg?style=flat)
![ViewCount](https://views.whatilearened.today/views/github/NayakPenguin/quickscan.svg?cache=remove)

# Quickscan - Realtime Machine Learning Based Pricing for Restaurant Menu

<p align="left">  
    <br>
	<a href="#">
        <img height=80 src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"> 
  </a>	
  <img hspace=20></div>
	<a href="#">
		<img src="https://raw.githubusercontent.com/Thomas-George-T/Thomas-George-T/master/assets/python.svg" alt="Python" title="Python" height=80 />
	</a>
 <img hspace=20></div>
	<a href="#">
		<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/1200px-Tensorflow_logo.svg.png" alt="" title="" height=80 />
	</a>
 <img hspace=20></div>
	<a href="#">
		<img src="https://github.com/NayakPenguin/quickscan/assets/93304796/6620680d-426d-4de7-b469-c20a211fa7b6" alt="" title="" height=80 />
	</a>
  <br>
</p>
<br/><br/>

## About

Welcome to the QuickScan - Realtime Machine Learning Based Pricing project! This project aims to help restaurant owners optimize their menu prices dynamically using advanced machine learning techniques. The system leverages QR codes for a contactless menu, integrates WhatsApp OTP verification, and utilizes datasets from Zomato and Uber Eats to adjust prices based on various factors.



## Features

- **QR Code-Based Menu**: Customers can scan a QR code to access the restaurant menu on their devices.
- **WhatsApp OTP Verification**: Integrated with Facebook API and Twilio for secure user verification.
- **Dynamic Pricing**: Prices are adjusted in real-time based on time of day, weather conditions, day of the week, and historical data.
- **Machine Learning Models**: Utilizes K-Means, Random Forest, and XGBoost algorithms to predict optimal prices with over 92% accuracy.
- **Cloud Deployment**: The system is deployed on AWS EC2 with Firebase for real-time database management.

## Machine Learning Explanation

### Factors Considered for Dynamic Pricing

The dynamic pricing strategy takes into account multiple factors to optimize menu prices effectively:

1. **Time of Day**: Different prices are set for breakfast, lunch, and dinner based on historical demand patterns.
2. **Weather Conditions**: Weather data is used to predict changes in customer behavior. For example, rainy days might see a higher demand for comfort foods.
3. **Day of the Week**: Prices vary between weekdays and weekends to capitalize on higher weekend traffic.
4. **Historical Sales Data**: Past sales data helps in understanding trends and setting prices that maximize revenue.
5. **External Datasets**: Leveraged datasets from Zomato and Uber Eats to incorporate broader market trends and competitive pricing.

### Machine Learning Models

- **K-Means Clustering**: Used to segment customers based on their ordering patterns and preferences, allowing for targeted pricing strategies.
- **Random Forest**: Implemented to predict the impact of different factors on sales and optimize pricing decisions.
- **XGBoost**: Applied for high-accuracy price predictions, factoring in complex interactions between variables.

### Model Performance

- Achieved over 92% accuracy in predicting optimal menu item prices.
- Continuous monitoring and refinement of models to adapt to new data and changing market conditions.

### Future Work

We are currently working on developing an automatic feedback loop pipeline. This pipeline will:

- **Automatically Collect Data**: Gather real-time data on sales, customer behavior, and external factors.
- **Model Retraining**: Continuously retrain models with new data to improve accuracy and adapt to changing conditions.
- **Feedback Integration**: Incorporate customer feedback and sales performance to fine-tune pricing strategies dynamically.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Firebase
- **Machine Learning**: Python (scikit-learn, XGBoost)
- **Deployment**: AWS EC2
- **APIs**: Facebook API, Twilio API, Zomato API, Uber Eats API
