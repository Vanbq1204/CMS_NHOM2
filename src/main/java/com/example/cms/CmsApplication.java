package com.example.cms;

import CMS.CustomerInfoService;
import CMS.CustomerInfoServiceHelper;
import org.omg.CORBA.ORB;
import org.omg.CORBA.Object;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Properties;


@SpringBootApplication
public class CmsApplication implements CommandLineRunner {

	public static void main(String[] args) {
		System.setProperty("jdk.tls.client.protocols", "TLSv1.2,TLSv1.1,TLSv1");
		System.setProperty("https.protocols", "TLSv1.2,TLSv1.1,TLSv1");
		SpringApplication.run(CmsApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

	}

//	@Override
//	public void run(String... args) throws Exception {
//		try {
//			Properties props = new Properties();
//			props.put("org.omg.CORBA.ORBInitialHost", "172.16.38.28");
//			props.put("org.omg.CORBA.ORBInitialPort", "1050");
//
//			String[] orbArgs = {};
//			ORB orb = ORB.init(orbArgs, props);
//
//			// Change this line
//			String corbaloc = "corbaloc::172.16.38.28:1050/CustomerInfoService";
//			Object obj = orb.string_to_object(corbaloc);
//
//			CustomerInfoService customerInfoService = CustomerInfoServiceHelper.narrow(obj);
//
//			if (customerInfoService != null) {
//				System.out.println("Successfully connected to CORBA server!");
//			} else {
//				System.out.println("Failed to connect to CORBA server.");
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
}