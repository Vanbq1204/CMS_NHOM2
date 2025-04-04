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
			String[] orbArgs = {};
			ORB orb = ORB.init(orbArgs, null);

			String corbaloc = "corbaloc::localhost:1050/CustomerInfoService";
			Object obj = orb.string_to_object(corbaloc);

			CustomerInfoService customerInfoService = CustomerInfoServiceHelper.narrow(obj);

			if (customerInfoService != null) {
				System.out.println("Successfully connected to CORBA server!");

			} else {
				System.out.println("Failed to connect to CORBA server.");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
