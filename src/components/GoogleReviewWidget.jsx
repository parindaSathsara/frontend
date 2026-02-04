import React, { useEffect } from 'react';

const GoogleReviewWidget = ({ placeId = 'ChIJN1t_tDeuEmsRUsoyG83frY4' }) => {
  useEffect(() => {
    // Load the Google Places API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDMVyiWjeJmHdppof5PwBWIYYOgIak8bVE&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="google-reviews-widget bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <svg className="h-8 w-8" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <div>
          <h3 className="font-serif text-xl text-luxury-black">Google Reviews</h3>
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              ))}
            </div>
            <span className="text-sm text-luxury-silver ml-1">5.0</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {/* Sample reviews - in production, these would come from Google API */}
        <div className="border-b border-luxury-silver/20 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white font-semibold">
              S
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-luxury-black">Sarah Johnson</h4>
                <span className="text-xs text-luxury-silver">2 weeks ago</span>
              </div>
              <div className="flex text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <p className="text-sm text-luxury-silver leading-relaxed">
                Absolutely stunning collection! The quality of the sarees is exceptional and the customer service is outstanding. Highly recommend SH Womens!
              </p>
            </div>
          </div>
        </div>

        <div className="border-b border-luxury-silver/20 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white font-semibold">
              P
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-luxury-black">Priya Sharma</h4>
                <span className="text-xs text-luxury-silver">1 month ago</span>
              </div>
              <div className="flex text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <p className="text-sm text-luxury-silver leading-relaxed">
                Found my perfect bridal saree here! The craftsmanship is incredible and the jewelry collection complements beautifully. Thank you!
              </p>
            </div>
          </div>
        </div>

        <div className="pb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-luxury-black">Ananya Reddy</h4>
                <span className="text-xs text-luxury-silver">2 months ago</span>
              </div>
              <div className="flex text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <p className="text-sm text-luxury-silver leading-relaxed">
                Amazing shopping experience! Fast delivery and the products exceeded my expectations. Will definitely shop again.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-luxury-silver/20">
        <a
          href="https://www.google.com/search?q=SHWomens#lrd=0x3ae25b001bd941f3:0xa0122ec2abf9f5d,1,,,,&write_review=true"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 border border-luxury-silver/30 text-luxury-black hover:border-gold-500 hover:bg-gold-50 transition-all text-sm font-medium"
        >
          <span>Write a Review</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default GoogleReviewWidget;
