package CMS;


/**
 * Generated from IDL struct "CustomerCare".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public abstract class CustomerCareHelper
{
	private volatile static org.omg.CORBA.TypeCode _type;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			synchronized(CustomerCareHelper.class)
			{
				if (_type == null)
				{
					_type = org.omg.CORBA.ORB.init().create_struct_tc(CMS.CustomerCareHelper.id(),"CustomerCare",new org.omg.CORBA.StructMember[]{new org.omg.CORBA.StructMember("ticketId", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("customerId", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("issue", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("status", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("priority", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("resolution", org.omg.CORBA.ORB.init().create_string_tc(0), null)});
				}
			}
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final CMS.CustomerCare s)
	{
		any.type(type());
		write( any.create_output_stream(),s);
	}

	public static CMS.CustomerCare extract (final org.omg.CORBA.Any any)
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
		return "IDL:CMS/CustomerCare:1.0";
	}
	public static CMS.CustomerCare read (final org.omg.CORBA.portable.InputStream in)
	{
		CMS.CustomerCare result = new CMS.CustomerCare();
		result.ticketId=in.read_string();
		result.customerId=in.read_string();
		result.issue=in.read_string();
		result.status=in.read_string();
		result.priority=in.read_string();
		result.resolution=in.read_string();
		return result;
	}
	public static void write (final org.omg.CORBA.portable.OutputStream out, final CMS.CustomerCare s)
	{
		java.lang.String tmpResult11 = s.ticketId;
out.write_string( tmpResult11 );
		java.lang.String tmpResult12 = s.customerId;
out.write_string( tmpResult12 );
		java.lang.String tmpResult13 = s.issue;
out.write_string( tmpResult13 );
		java.lang.String tmpResult14 = s.status;
out.write_string( tmpResult14 );
		java.lang.String tmpResult15 = s.priority;
out.write_string( tmpResult15 );
		java.lang.String tmpResult16 = s.resolution;
out.write_string( tmpResult16 );
	}
}
