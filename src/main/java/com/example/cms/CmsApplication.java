package com.example.cms;

import CMS.CustomerInfoService;
import CMS.CustomerInfoServiceHelper;
import org.omg.CORBA.ORB;
import org.omg.CORBA.Object;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CmsApplication {

	public static void main(String[] args) {

		SpringApplication.run(CmsApplication.class, args);

		try {
			String[] orbArgs = {};  // Any additional arguments if required
			ORB orb = ORB.init(orbArgs, null);

			// Create the CORBA object reference using corbaloc URL
			String corbaloc = "corbaloc::localhost:1050/CustomerInfoService";  // Replace with your CORBA server's corbaloc URL
			Object obj = orb.string_to_object(corbaloc);  // Convert the corbaloc string to an object reference

			// Narrow the object reference to the correct type (CustomerInfoService)
			CustomerInfoService customerInfoService = CustomerInfoServiceHelper.narrow(obj);

			if (customerInfoService != null) {
				System.out.println("Successfully connected to CORBA server!");
				// Now you can call methods on customerInfoService (e.g., getCustomer, searchCustomer, etc.)
				// Example: CustomerInfo customer = customerInfoService.getCustomer("customerId");
			} else {
				System.out.println("Failed to connect to CORBA server.");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
