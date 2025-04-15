package com.example.cms.corba.config;

import org.omg.CORBA.ORB;
import org.omg.CosNaming.NamingContextExt;
import org.omg.CosNaming.NamingContextExtHelper;
import org.omg.PortableServer.POA;
import org.omg.PortableServer.POAHelper;
import org.omg.PortableServer.POAManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.Properties;

@Configuration
@Profile("corba")
public class CorbaConfig {
    @Bean
    public ORB orb() throws Exception {
        System.setProperty("org.omg.CORBA.ORBClass", "org.jacorb.orb.ORB");
        System.setProperty("org.omg.CORBA.ORBSingletonClass", "org.jacorb.orb.ORBSingleton");

        Properties props = new Properties();
        props.put("org.omg.CORBA.ORBClass", "org.jacorb.orb.ORB");
        props.put("org.omg.CORBA.ORBSingletonClass", "org.jacorb.orb.ORBSingleton");

        props.put("ORBInitRef.NameService", "corbaloc::172.16.38.28:1050/NameService");

        props.put("jacorb.connection.client.connect_timeout", "120000");
        props.put("jacorb.retries", "10");
        props.put("jacorb.retry_interval", "2000");
        props.put("jacorb.poa.thread_pool_max", "20");
        props.put("jacorb.poa.thread_pool_min", "5");

        ORB orb = ORB.init(new String[]{}, props);
        System.out.println("ORB initialized successfully");
        return orb;
    }

    @Bean
    public POA rootPOA(ORB orb) throws Exception {
        try {
            org.omg.CORBA.Object obj = orb.resolve_initial_references("RootPOA");
            POA rootPOA = POAHelper.narrow(obj);

            POAManager manager = rootPOA.the_POAManager();
            manager.activate();

            System.out.println("RootPOA activated successfully");
            return rootPOA;
        } catch (Exception e) {
            System.err.println("Failed to initialize RootPOA: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to initialize RootPOA", e);
        }
    }

    @Bean
    public NamingContextExt namingContextExt(ORB orb) {
        try {
            System.out.println("Waiting for NameService to start...");
            Thread.sleep(5000);

            for (int attempt = 1; attempt <= 10; attempt++) {
                try {
                    org.omg.CORBA.Object obj = orb.resolve_initial_references("NameService");
                    NamingContextExt namingContext = NamingContextExtHelper.narrow(obj);
                    System.out.println("Connected to NameService successfully");
                    return namingContext;
                } catch (Exception e) {
                    System.err.println("Attempt " + attempt + " failed to connect to NameService: " + e.getMessage());
                    if (attempt < 10) {
                        Thread.sleep(5000);
                    } else {
                        throw e;
                    }
                }
            }
            throw new RuntimeException("Failed to connect to NameService after multiple attempts");
        } catch (Exception e) {
            System.err.println("Could not connect to NameService: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to connect to NameService", e);
        }
    }
}