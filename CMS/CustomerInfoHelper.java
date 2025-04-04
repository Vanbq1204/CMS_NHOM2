package CMS;


/**
 * Generated from IDL struct "CustomerInfo".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public abstract class CustomerInfoHelper
{
	private volatile static org.omg.CORBA.TypeCode _type;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			synchronized(CustomerInfoHelper.class)
			{
				if (_type == null)
				{
					_type = org.omg.CORBA.ORB.init().create_struct_tc(CMS.CustomerInfoHelper.id(),"CustomerInfo",new org.omg.CORBA.StructMember[]{new org.omg.CORBA.StructMember("customerId", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("customerName", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("customerEmail", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("customerPhone", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("customerAddress", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("customerStatus", org.omg.CORBA.ORB.init().create_string_tc(0), null)});
				}
			}
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final CMS.CustomerInfo s)
	{
		any.type(type());
		write( any.create_output_stream(),s);
	}

	public static CMS.CustomerInfo extract (final org.omg.CORBA.Any any)
	{
		org.omg.CORBA.portable.InputStream in = any.create_input_stream();
		try
		{
			return read (in);
		}
		finally
		{
			try
			{
				in.close();
			}
			catch (java.io.IOException e)
			{
			throw new RuntimeException("Unexpected exception " + e.toString() );
			}
		}
	}

	public static String id()
	{
		return "IDL:CMS/CustomerInfo:1.0";
	}
	public static CMS.CustomerInfo read (final org.omg.CORBA.portable.InputStream in)
	{
		CMS.CustomerInfo result = new CMS.CustomerInfo();
		result.customerId=in.read_string();
		result.customerName=in.read_string();
		result.customerEmail=in.read_string();
		result.customerPhone=in.read_string();
		result.customerAddress=in.read_string();
		result.customerStatus=in.read_string();
		return result;
	}
	public static void write (final org.omg.CORBA.portable.OutputStream out, final CMS.CustomerInfo s)
	{
		java.lang.String tmpResult0 = s.customerId;
out.write_string( tmpResult0 );
		java.lang.String tmpResult1 = s.customerName;
out.write_string( tmpResult1 );
		java.lang.String tmpResult2 = s.customerEmail;
out.write_string( tmpResult2 );
		java.lang.String tmpResult3 = s.customerPhone;
out.write_string( tmpResult3 );
		java.lang.String tmpResult4 = s.customerAddress;
out.write_string( tmpResult4 );
		java.lang.String tmpResult5 = s.customerStatus;
out.write_string( tmpResult5 );
	}
}
