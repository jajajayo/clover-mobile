package com.clover;

import com.facebook.react.ReactActivity;
import com.google.firebase.messaging.FirebaseMessaging;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    FirebaseMessaging.getInstance().subscribeToTopic("all");
    return "clover";
  }
}