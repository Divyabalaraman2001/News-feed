const trendingNewsEmail = (newsTitle, newsSummary, newsLink) => {
    return `
      <h1 style="color: #008080; font-family: 'Arial', sans-serif; text-align: center;">Trending News Update</h1>
      
      <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px;">
        <h2 style="font-size: 20px; font-family: 'Arial', sans-serif; color: #333; text-align: center;">${newsTitle}</h2>
        <p style="font-size: 16px; font-family: 'Arial', sans-serif; color: #444; text-align: center;">${newsSummary}</p>
        
        <div style="text-align: center; margin-top: 20px;">
          <a href="${newsLink}" style="display: inline-block; background-color: #008080; color: #fff; font-size: 18px; font-family: 'Arial', sans-serif; text-decoration: none; padding: 10px 20px; border-radius: 5px; border: 2px solid #008080; transition: background-color 0.3s ease-in-out;">
            Read More
          </a>
        </div>
      </div>

      <p style="font-size: 14px; font-family: 'Arial', sans-serif; color: #666; text-align: center; margin-top: 20px;">
        Stay updated with the latest trending news. Visit your <a href="${"http://localhost:3000/trendingnews"}" style="color: #008080; text-decoration: none;">News Feed</a> now!
      </p>
    `;
};


  



module.exports = {trendingNewsEmail}